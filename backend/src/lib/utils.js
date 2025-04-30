import jwt from 'jsonwebtoken';

function generateToken(userId, res) {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.cookie('jwt', token, {
    expiresIn: '1d',
    httpOnly: true,
  });

  return token;
}

export default generateToken;