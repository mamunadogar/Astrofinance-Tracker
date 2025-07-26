const addBookmarkBtn = document.getElementById("add-bookmark");
const bookmarkList = document.getElementById("bookmark-list");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");

document.addEventListener("DOMContentLoaded", loadBookmarks);

addBookmarkBtn.addEventListener("click", () => {
  const name = bookmarkNameInput.value.trim();
  const url = bookmarkUrlInput.value.trim();

  if (!name || !url) {
    showToast("👀 Babe, fill both fields!");
    return;
  }

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    showToast("💔 Enter a valid URL (http/https)");
    return;
  }

  addBookmark(name, url);
  saveBookmark(name, url);
  bookmarkNameInput.value = "";
  bookmarkUrlInput.value = "";
  showToast("✅ Bookmark saved, baddie!");
});

function addBookmark(name, url) {
  const li = document.createElement("li");

  const link = document.createElement("a");
  link.href = url;
  link.textContent = `💖 ${name}`;
  link.target = "_blank";

  const removeButton = document.createElement("button");
  removeButton.textContent = "✖ Remove";
  removeButton.addEventListener("click", () => {
    bookmarkList.removeChild(li);
    removeBookmarkFromStorage(name, url);
    showToast("🗑️ Deleted, babe.");
  });

  li.appendChild(link);
  li.appendChild(removeButton);
  bookmarkList.appendChild(li);
}

function getBookmarksFromStorage() {
  const bookmarks = localStorage.getItem("bookmarks");
  return bookmarks ? JSON.parse(bookmarks) : [];
}

function saveBookmark(name, url) {
  const bookmarks = getBookmarksFromStorage();
  bookmarks.push({ name, url });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function loadBookmarks() {
  const bookmarks = getBookmarksFromStorage();
  bookmarks.forEach((bookmark) => addBookmark(bookmark.name, bookmark.url));
}

function removeBookmarkFromStorage(name, url) {
  let bookmarks = getBookmarksFromStorage();
  bookmarks = bookmarks.filter(
    (bookmark) => bookmark.name !== name || bookmark.url !== url
  );
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "30px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#ff4d94";
  toast.style.color = "#fff";
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "8px";
  toast.style.fontWeight = "600";
  toast.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
  toast.style.zIndex = "999";
  toast.style.transition = "opacity 0.5s ease";
  toast.style.opacity = "1";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => document.body.removeChild(toast), 500);
  }, 2000);
}
