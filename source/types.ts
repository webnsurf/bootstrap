export type RawArgs = string[];

export interface InitialArguments {
  name?: string;
  skipPrompts?: boolean;
  noBackend?: boolean;
  noGit?: boolean;
  noRouter?: boolean;
  noLogin?: boolean;
  noAntd?: boolean;
  runInstall?: boolean;
}

export interface Options {
  name: string;
  withBackend: boolean;
  withGit: boolean;
  withRouter: boolean;
  withLogin: boolean;
  withAntd: boolean;
  withInstall: boolean;
}
