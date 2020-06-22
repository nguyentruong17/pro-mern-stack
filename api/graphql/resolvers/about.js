let aboutMessage = "Issue Tracker API 1.0";

const getAboutMessage = () => {
    return aboutMessage
}
const setAboutMessage = (obj, args, context, info) => {
  const { message } = args;
  return (aboutMessage = message);
};

module.exports = { getAboutMessage, setAboutMessage }
