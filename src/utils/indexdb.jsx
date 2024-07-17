import { parseBuffer } from "music-metadata";

export function openDatabase(version = 2) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("fileStorage", 2);

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

  const db = await openDatabase(2);
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
  const db = await openDatabase(2);
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

  const db = await openDatabase(2);
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

export async function fetchPlaylists() {
  const db = await openDatabase(2);
  const transaction = db.transaction(["playlists"], "readonly");
  const objectStore = transaction.objectStore("playlists");
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

export async function createPlaylists(playlistName) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabase(2);
    if (!db.objectStoreNames.contains("playlists")) {
      const version = db.version + 1;
      db.close();
      const request = indexedDB.open("fileStorage", version);

      request.onupgradeneeded = function (event) {
        const db = event.target.result;
        db.createObjectStore("playlists", { keyPath: "id", autoIncrement: true });
      };

      request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction(["playlists"], "readwrite");
        const playlistsStore = transaction.objectStore("playlists");

        const playlist = {
          name: playlistName,
          files: [],
        };

        playlistsStore.add(playlist);

        transaction.oncomplete = function () {
          resolve("Playlist created successfully!");
        };

        transaction.onerror = function (event) {
          reject(event.target.error);
        };
      };

      request.onerror = function (event) {
        reject(event.target.error);
      };
    } else {
      const transaction = db.transaction(["playlists"], "readwrite");
      const playlistsStore = transaction.objectStore("playlists");

      const playlist = {
        name: playlistName,
        files: [],
      };

      playlistsStore.add(playlist);

      transaction.oncomplete = function () {
        resolve("Playlist created successfully!");
      };

      transaction.onerror = function (event) {
        reject(event.target.error);
      };
    }
  });
}

// Update

export async function updatePlaylist(index, newName, newDescription, newImage) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabase(2);
    const transaction = db.transaction(["playlists"], "readwrite");
    const playlistsStore = transaction.objectStore("playlists");

    const request = playlistsStore.get(index);

    request.onsuccess = function (event) {
      const playlist = event.target.result;

      if (playlist) {
        playlist.name = newName;
        playlist.description = newDescription;
        playlist.image = newImage; // Add this line
        playlistsStore.put(playlist);
      }
    };

    request.onerror = function (event) {
      reject(event.target.error);
    };

    transaction.oncomplete = function () {
      resolve("Playlist name updated successfully!");
    };

    transaction.onerror = function (event) {
      reject(event.target.error);
    };
  });
}

export async function deletePlaylist(index) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabase(2);
    const transaction = db.transaction(["playlists"], "readwrite");
    const playlistsStore = transaction.objectStore("playlists");

    const request = playlistsStore.delete(index);

    request.onsuccess = function () {
      resolve("Playlist deleted successfully!");
    };

    request.onerror = function (event) {
      reject(event.target.error);
    };
  });
}

export async function deleteMusic(index) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabase(2);
    const transaction = db.transaction(["files"], "readwrite");
    const filesStore = transaction.objectStore("files");
    const request = filesStore.delete(index);
    request.onsuccess = function () {
      resolve("Music deleted successfully!");
    };

    request.onerror = function (event) {
      reject(event.target.error);
    };
  });
}

export async function addMusicToPlaylist(playlistId, musicId) {
  return new Promise(async (resolve, reject) => {
    const db = await openDatabase(2);
    const transaction = db.transaction(["playlists"], "readwrite");
    const playlistsStore = transaction.objectStore("playlists");

    const request = playlistsStore.get(playlistId);

    request.onsuccess = function (event) {
      const playlist = event.target.result;

      if (playlist) {
        playlist.files.push(musicId);
        playlistsStore.put(playlist);
      }
    };

    request.onerror = function (event) {
      reject(event.target.error);
    };

    transaction.oncomplete = function () {
      resolve("Music added to playlist successfully!");
    };

    transaction.onerror = function (event) {
      reject(event.target.error);
    };
  });
}
