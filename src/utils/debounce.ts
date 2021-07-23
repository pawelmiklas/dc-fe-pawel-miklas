const debounce = <T>(callback: T, wait: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return (event: Event) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      if (typeof callback === "function") {
        callback(event);
      }
    }, wait);
  };
};

export { debounce };
