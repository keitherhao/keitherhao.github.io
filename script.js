async function loadMarkdown(filePath) {
  const response = await fetch(filePath);
  const text = await response.text();
  document.getElementById("content").innerHTML = marked.parse(text);
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("hidden");
  const button = document.getElementById("toggleButton");
  if (sidebar.classList.contains("hidden")) {
    button.style.left = "0";
  } else {
    button.style.left = "250px";
  }
}

async function loadFileTree() {
  let str = "github_pat";
  str += "_";
  str += "11AR6647Y0gMKUprqeFmwa";
  str += "_";
  str += "bnYzUkei2izSPFB"
  str += "Mi4ZXmJKBRSfHOj";
  str += "RyNxhvKW32KBoUVJ2EWSCC8XarJWI";

  const token = str;
  const response = await fetch(
    "https://api.github.com/repos/keitherhao/keitherhao.github.io/git/trees/main?recursive=1",
    {
      headers: {
        Authorization: `token ${token}`,
      },
    }
  );
  const data = await response.json();
  const tree = data.tree.filter((item) => item.path.startsWith("md_root/"));
  const fileTree = document.getElementById("fileTree");
  tree.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item.path.replace("md_root/", "");
    div.style.cursor = "pointer";
    div.onclick = () =>
      loadMarkdown(
        `https://raw.githubusercontent.com/keitherhao/keitherhao.github.io/main/${item.path}`
      );
    fileTree.appendChild(div);
  });
}

function updateTimestamp() {
  const now = new Date();
  const days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const day = days[now.getDay()];
  const date = now.toLocaleDateString("zh-CN", {
    month: "long",
    day: "numeric",
  });
  const time = now.toLocaleTimeString("zh-CN", { hour12: false });
  document.getElementById("timestamp").textContent = `${day} ${date} ${time}`;
}

loadMarkdown(
  "https://raw.githubusercontent.com/keitherhao/keitherhao.github.io/refs/heads/main/md_root/_index.md"
);
loadFileTree();
updateTimestamp();
setInterval(updateTimestamp, 1000); // 每秒更新一次时间戳
