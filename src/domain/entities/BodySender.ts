type actions = 'update' | 'delete' | 'read' | 'list' | 'login' | 'logout' | 'register';

interface RequestWithAction<T = any> extends Request {
    json: () => Promise<{
      action: actions;
      payload: T;
    }>;
  }