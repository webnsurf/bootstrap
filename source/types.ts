export type RawArgs = string[];

export interface InitialArguments {
  projectName?: string;
  skipPrompts?: boolean;
  setDefaults?: boolean;
  noBackend?: boolean;
  noGit?: boolean;
  noRouter?: boolean;
  noLogin?: boolean;
  designLibrary?: 'antd' | 'material';
  withDocker?: boolean;
  withPipeline?: boolean;
  runInstall?: boolean;
  domain?: string;
  serverUsername?: string;
  serverIp?: string;
}

export interface InitialOptions {
  projectName: string;
  projectPath: string;
  withBackend: boolean;
  withGit: boolean;
  withRouter: boolean;
  withLogin: boolean;
  withDocker: boolean;
  withPipeline: boolean;
  withInstall: boolean;
  designLibrary: 'antd' | 'material' | null;
}

export interface DomainOptions {
  domain: string;
}

export interface ServerOptions {
  serverUsername: string;
  serverIp: string;
}

export interface Options extends InitialOptions, ServerOptions {}

export interface Variables {
  projectName?: string;
  projectPath?: string;
  serverUsername?: string;
  serverIp?: string;
}

export type SavedOptions = Omit<InitialOptions, 'projectName' | 'projectPath'> & DomainOptions & ServerOptions;
