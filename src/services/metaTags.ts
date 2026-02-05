/**
 * Simple utility to share links on social media
 */

export const shareOnSocialMedia = (
  platform: 'x' | 'facebook' | 'linkedin',
  url: string
): void => {
  let shareUrl = '';
  console.log(url)

  switch (platform) {
    case 'x':
      shareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(url)}`;
      break;

    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      break;

    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
      break;
  }

  if (shareUrl) {
    window.open(shareUrl, `share-${platform}`, 'width=550,height=420');
  }
};
