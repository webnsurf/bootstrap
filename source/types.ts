export type RawArgs = string[];

export interface InitialArguments {
  projectName?: string;
  skipPrompts?: boolean;
  noBackend?: boolean;
  noGit?: boolean;
  noRouter?: boolean;
  noLogin?: boolean;
  noAntd?: boolean;
  runInstall?: boolean;
}

export interface Options {
  projectName: string;
  projectPath: string;
  withBackend: boolean;
  withGit: boolean;
  withRouter: boolean;
  withLogin: boolean;
  withAntd: boolean;
  withInstall: boolean;
}
