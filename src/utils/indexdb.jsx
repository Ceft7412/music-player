import { parseBuffer } from "music-metadata";

export function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("fileStorage", 1);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("files")) {
        db.createObjectStore("files", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };

    request.onerror = function (event) {
      reject(event.target.error);
    };
  });
}

export async function storeFiles(files) {
  const processedFiles = [];

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const metadata = await parseBuffer(Buffer.from(arrayBuffer), file.type);
    console.log("metadata:", metadata);

    const codecToFileExtension = {
      "MPEG 1 Layer 3": "MP3",
      PCM: "WAV",
      FLAC: "FLAC",
    };

    const fileExtension = codecToFileExtension[metadata.format.codec] || file.type;
    const durationInSeconds = metadata.format.duration;
    const sizeInBytes = file.size;
    processedFiles.push({
      name: metadata.common.title || file.name,
      artist: metadata.common.artist,
      size: parseFloat((sizeInBytes / 1024 / 1024).toFixed(2)) + " MB",
      type: fileExtension,
      lastModified: file.lastModified,
      duration: {
        minutes: Math.floor(durationInSeconds / 60),
        seconds: Math.floor(durationInSeconds % 60),
      },
      content: arrayBuffer,
      kHz: metadata.format.sampleRate / 1000,
      kbps: metadata.format.bitrate / 1000,
    });
  }

  console.log("files:", processedFiles);
  console.log("files:", processedFiles.length);
  const db = await openDatabase();
  const transaction = db.transaction(["files"], "readwrite");
  const objectStore = transaction.objectStore("files");

  for (const fileData of processedFiles) {
    objectStore.add(fileData);
  }

  return new Promise((resolve, reject) => {
    transaction.oncomplete = function () {
      resolve("All files stored successfully!");
    };

    transaction.onerror = function (event) {
      reject(event.target.error);
    };
  });
}

export async function fetchStoredFiles() {
  const db = await openDatabase();
  const transaction = db.transaction(["files"], "readonly");
  const objectStore = transaction.objectStore("files");
  const request = objectStore.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = function (event) {
      resolve(event.target.result);
    };

    request.onerror = function (event) {
      reject(event.target.error);
    };
  });
}

export async function setActiveItem(item) {
  localStorage.setItem("activeItem", item.id);
}

export async function fetchActiveItem() {
  const activeItemId = localStorage.getItem("activeItem");
  if (!activeItemId) return null;

  const db = await openDatabase();
  const transaction = db.transaction(["files"], "readonly");
  const objectStore = transaction.objectStore("files");
  const request = objectStore.get(Number(activeItemId));

  return new Promise((resolve, reject) => {
    request.onsuccess = function (event) {
      resolve(event.target.result);
    };

    request.onerror = function (event) {
      reject(event.target.error);
    };
  });
}
