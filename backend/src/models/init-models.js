import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _comments from  "./comments.js";
import _images from  "./images.js";
import _user_images from  "./user_images.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const comments = _comments.init(sequelize, DataTypes);
  const images = _images.init(sequelize, DataTypes);
  const user_images = _user_images.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  images.belongsToMany(users, { as: 'user_id_users', through: user_images, foreignKey: "image_id", otherKey: "user_id" });
  users.belongsToMany(images, { as: 'image_id_images', through: user_images, foreignKey: "user_id", otherKey: "image_id" });
  comments.belongsTo(images, { as: "image", foreignKey: "image_id"});
  images.hasMany(comments, { as: "comments", foreignKey: "image_id"});
  user_images.belongsTo(images, { as: "image", foreignKey: "image_id"});
  images.hasMany(user_images, { as: "user_images", foreignKey: "image_id"});
  comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "user_id"});
  images.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(images, { as: "images", foreignKey: "user_id"});
  user_images.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_images, { as: "user_images", foreignKey: "user_id"});

  return {
    comments,
    images,
    user_images,
    users,
  };
}
