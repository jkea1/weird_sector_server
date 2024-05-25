export const extractHashtags = (text) => {
  const hashtagPattern = /#([^#\s]*)/g

  let match
  const hashtags = []

  while ((match = hashtagPattern.exec(text)) !== null) {
    hashtags.push(match[1])
  }

  return hashtags
}
