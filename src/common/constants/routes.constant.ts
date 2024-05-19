export const routes = {
  base_url: 'api/v1',
  auth: {
    prefix: 'auth',
    sign_up: 'signup',
    sign_in: 'signin',
    logout: 'logout',
    verify: 'verify'
  },
  blacklists: {
    prefix: 'blacklists',
    tokens: { prefix: 'tokens', get: ':jti', delete: ':jti' }
  },
  users: {
    prefix: 'users',
    get_all: '',
    get: ':id',
    create: '',
    update: ':id',
    delete: ':id'
  },
  mothers: {
    prefix: 'mothers',
    get_all: '',
    get: ':id',
    create: '',
    update: ':id',
    delete: ':id'
  }
};
