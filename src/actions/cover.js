export const showCoverLoader = store => {
  const newCover = { ...store.state.cover }
  newCover.loaderDisplay = 'block'
  store.setState({ cover: newCover });
};

export const showCoverBg = store => {
  const newCover = { ...store.state.cover }
  newCover.bgDisplay = 'block'
  store.setState({ cover: newCover });
};

export const hideCoverLoader = store => {
  const newCover = { ...store.state.cover }
  newCover.loaderDisplay = 'none'
  store.setState({ cover: newCover });
};

export const hideCoverBg = store => {
  const newCover = { ...store.state.cover }
  newCover.bgDisplay = 'none'
  store.setState({ cover: newCover });
};