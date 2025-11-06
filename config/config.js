module.exports = {
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/farm_management',
  jwtSecret: process.env.JWT_SECRET || 'a_secure_jwt_secret'
};