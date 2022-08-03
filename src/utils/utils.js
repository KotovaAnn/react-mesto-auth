function RenderLoading(isLoading) {
  if(isLoading) {
    return "Сохранение...";
  } else {
    return "Сохранить";
  }
}

export default RenderLoading;