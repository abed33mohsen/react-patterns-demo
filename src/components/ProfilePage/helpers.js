export function getProfileFormState(profile) {
  const detailsMap = profile.details.reduce((accumulator, item) => ({
    ...accumulator,
    [item.label]: item.value,
  }), {});

  return {
    name: detailsMap.Name || '',
    role: detailsMap.Role || '',
    title: profile.title,
    description: profile.description,
    overviewTitle: profile.overviewTitle,
    overviewText: profile.overviewText,
  };
}
