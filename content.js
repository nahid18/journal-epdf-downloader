scanHTMLForDOIUrls();

function scanHTMLForDOIUrls() {
  const docLinks = document.links;
  for (let i = 0; i < docLinks.length; i++) {
    const link = docLinks[i].href;
    if (link.includes("/doi/reader/") || link.includes("/doi/epdf/")) {
      addDownloadButton(link);
    }
  }
}

function addDownloadButton(url) {
  const newUrl = getUpdatedURL(url);
  if (newUrl) {
    const button = document.createElement("button");
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.backgroundColor = "transparent";
    button.style.border = "none";
    button.style.zIndex = "9999";

    const iconImage = new Image();
    iconImage.src = chrome.runtime.getURL('pdf.svg');
    iconImage.style.width = "auto";
    iconImage.style.height = "60px";
    iconImage.style.objectFit = "contain";

    button.appendChild(iconImage);

    button.addEventListener("click", function () {
      window.open(newUrl, "_blank");
    });

    document.body.appendChild(button);
  }
}

function getUpdatedURL(url) {
  if (url.includes("/doi/reader/")) {
    return url.replace("/doi/reader/", "/doi/pdf/");
  } else if (url.includes("/doi/epdf/")) {
    return url.replace("/doi/epdf/", "/doi/pdf/");
  }
  return null;
}
