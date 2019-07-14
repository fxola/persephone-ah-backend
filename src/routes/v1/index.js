import auth from './auth.route';
import users from './user.route';
import article from './article.route';
import profile from './profile.route';

export default app => {
  app.use(`${process.env.API_VERSION}/users`, auth);
  app.use(`${process.env.API_VERSION}/users/`, users);
  app.use(`${process.env.API_VERSION}/articles/`, article);
  app.use(`${process.env.API_VERSION}/profiles`, profile);
};
