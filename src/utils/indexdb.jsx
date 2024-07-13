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
  const db = await openDatabase();
  const transaction = db.transaction(["files"], "readwrite");
  const objectStore = transaction.objectStore("files");

  for (const file of files) {
    objectStore.add({ file });
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
      const files = event.target.result.map((item) => item.file);
      resolve(files);
    };

    request.onerror = function (event) {
      reject(event.target.error);
    };
  });
}
