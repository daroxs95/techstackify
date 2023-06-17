const shareHandler = (title?: string, url?: string, text?: string) => {
  if (navigator.share) {
    navigator
      .share({
        title,
        text,
        url,
      })
      .catch(() => alert("Sorry, error using share api 🥲"));
  } else if (navigator.clipboard) {
    navigator.clipboard
      .writeText(url)
      .then(() =>
        alert("Could'nt use share api, but url was copied to clipboard 👽")
      )
      .catch(() =>
        alert("Sorry, error using share api nor copy url to clipboard 🥲")
      );
  }
};

export default shareHandler;
