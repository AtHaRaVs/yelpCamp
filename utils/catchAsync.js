module.exports = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};

// this is a fucntion which accepts a fucntion
// then it also returns a function, and execute the fucntions also catching any errors
