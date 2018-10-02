export function timeSince(date: Date) {
  const seconds = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + ' years';
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + ' months';
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + ' days';
  } else if (interval === 1) {
    return interval + ' day';
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + ' hours';
  } else if (interval === 1) {
    return interval + ' hour';
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + ' minutes';
  } else if (interval === 1) {
    return interval + ' minute';
  }
  return Math.floor(seconds) + ' seconds';
}