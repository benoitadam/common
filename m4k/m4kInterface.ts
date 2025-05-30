export interface M4kExecResult {
    cmd: string,
    out: string,
    err: string,
    code: number,
}

export interface M4kFileInfo {
    type: 'file'|'dir'|'';
    path: string;
    mimeType: string;
    size: number;
    accessed: number;
    modified: number;
    created: number;
    url: string;
    width?: number;
    height?: number;
}

export interface M4kLog {
    tag?: string;
    level: string;
    message: string;
    data?: any;
    source?: string;
    line?: number;
}

export type PlaylistItem = M4kFileInfo & {
    waitMs?: number
}

export interface M4kConfig {
    name?: string;
    copyDir?: string;
    password?: string;
    playlist?: {
        items?: PlaylistItem[];
    };
    test?: any;

    auth_email?: string;
    auth_password?: string;

    isKioskOn?: boolean;
    isScreenOn?: boolean;
    screenOrientation?: "landscape" | "portrait" | "reverse_landscape" | "reverse_portrait";
    injectJs?: string;
    url?: string;
    backColor?: string;

    initialScale?: number;

    // isDebugging?: boolean
    // isSupportZoom?: boolean
    // hasDomStorage?: boolean
    // isOverviewMode?: boolean
    // isUseViewPort?: boolean
    // hasContentAccess?: boolean
    // hasFileAccess?: boolean
    // hasZoomControls?: boolean
    // displayZoomControls?: boolean
    // hasMediaPlaybackRequiresUserGesture?: boolean
    
    textZoom?: number;
    mixedContent?: "never" | "compatible" | "always";

    readTimeout?: number;

    itemAnim?: 'rightToLeft' | 'topToBottom' | 'fade' | 'zoom';
    itemDurationMs?: number;
    itemFit?: 'contain' | 'cover' | 'fill';
    hasVideoMuted?: boolean;

    views?: {
        [key: string]: M4kViewConfig;
    };
}

export interface M4kViewConfig {
    remove?: boolean;

    x?: number;
    y?: number;
    z?: number;
    w?: number;
    h?: number;

    show?: boolean;

    webConfig?: {
        startUrl?: string;
        injectJs?: string;
        initialScale?: number;

        debuggingEnabled?: boolean;
        supportZoom?: boolean;
        domStorageEnabled?: boolean;
        loadWithOverviewMode?: boolean;
        useWideViewPort?: boolean;
        allowContentAccess?: boolean;
        allowFileAccess?: boolean;
        textZoom?: number;
        builtInZoomControls?: boolean;
        displayZoomControls?: boolean;
        mediaPlaybackRequiresUserGesture?: boolean;
        mixedContentMode?: 'never'|'compatible'|'always';
    };
    url?: string;
    reset?: boolean;
}

// interface BridgeConfig {
//     kiosk?: boolean;
//     startUrl?: string;
//     logs?: boolean;
//     injectJs?: string|string[];
//     readyJs?: string|string[];
//     screenRotate?: number;
//     webviewRotate?: number;
//     idleMs?: number;
//     updateMs?: number;
//     captureMs?: number;
// }

export interface M4kDeviceInfo {
    webview?: string;
    type?: string;
    os?: string;
    ip?: string;
    width?: number;
    height?: number;
    storage?: string;
    model?: string;
    architecture?: string;
}

export interface M4kPackageInfo {
    packageName: string;
    appName: string;
    category: number;
    flags: number;
    dataDir: string;
    enabled: boolean;

    versionName?: string;
    versionCode?: number;
    
    isSystemApp: boolean;
    isUpdatedSystemApp: boolean;
    
    permissions?: string[];
    
    activities?: {
        package: string;
        name: string;
        exported: boolean;
    }[];
    
    mainActivities?: {
        package: string;
        name: string;
        exported: boolean;
    }[];
    
    intentFilters?: {
        activity: string;
        filters: {
            actions?: string[];
            categories?: string[];
            schemes?: string[];
            authorities?: {
                host: string;
                port: number;
            }[];
            paths?: string[];
        }[];
    }[];
}

export type M4kFlag = 
    "broughtToFront"|
    "clearTask"|
    "clearTop"|
    "clearWhenTaskReset"|
    "excludeFromRecents"|
    "forwardResult"|
    "launchedFromHistory"|
    "launchAdjacent"|
    "matchExternal"|
    "multipleTask"|
    "newDocument"|
    "newTask"|
    "noAnimation"|
    "noHistory"|
    "noUserAction"|
    "previousIsTop"|
    "reorderToFront"|
    "requireDefault"|
    "requireNonBrowser"|
    "resetTaskIfNeeded"|
    "retainInRecents"|
    "singleTop"|
    "taskOnHome"|
    "debugLogResolution"|
    "directBootAuto"|
    "excludeStoppedPackages"|
    "fromBackground"|
    "grantPersistableUriPermission"|
    "grantPrefixUriPermission"|
    "grantReadUriPermission"|
    "grantWriteUriPermission"|
    "includeStoppedPackages"|
    "receiverForeground"|
    "receiverNoAbort"|
    "receiverRegisteredOnly"|
    "receiverReplacePending"|
    "receiverVisibleToInstantApps"

export interface M4kIntentOptions {
    uri?: string;
    action?: string;
    type?: string;
    package?: string;
    component?: string;
    flags?: M4kFlag[]|number;
    categories?: string[];
    extras?: Record<string, any>;
}

export type M4kPath = string|string[];
export type _M4kEvent =
    { type: 'touch', action: 'up'|'down'|'move', x: number, y: number, xRatio: number, yRatio: number }|
    { type: 'storage', action: "mounted"|"removed"|"unmounted"|"eject", path: 'string' }|
    { type: 'test' };
export type M4kEvent = _M4kEvent & { id: string };
export type M4kSignalEvent = _M4kEvent & { id?: string };

export type M4kResizeOptions = {
    dest?: M4kPath,
    scale?: number,
    quality?: number,
    format?: 'jpeg'|'png',

    w?: number,
    wMin?: number,
    wMax?: number,
    h?: number,
    hMin?: number,
    hMax?: number,
    min?: number,
    max?: number,

    // transform?: '90deg'|'180deg'|'270deg'|'flipX'|'flipY',
};

export interface M4Kiosk {
    global: any;

    pressKey(key: string): Promise<void>;
    tap(x: number, y:number): Promise<void>;
    swipe(x: number, y:number, xEnd: number, yEnd:number, ms:number): Promise<void>;
    move(x: number, y:number): Promise<void>;
    down(x: number, y:number): Promise<void>;
    up(x: number, y:number): Promise<void>;
    inputText(text: string): Promise<void>;

    loadJs(path: string): Promise<any>;
    eval(script: string): Promise<null|string|number>;
    js(script: string): Promise<{ success: boolean, value?: any, error?: string }>;
    su(cmd: string): Promise<M4kExecResult>;
    sh(cmd: string): Promise<M4kExecResult>;

    save(): Promise<void>;
    load(): Promise<void>;
    data(): Promise<M4kConfig>;
    get<K extends keyof M4kConfig>(key: K): Promise<M4kConfig[K]>;
    set<K extends keyof M4kConfig>(key: K, value: M4kConfig[K]): Promise<void>;
    keys(): Promise<(keyof M4kConfig)[]>;
    merge(changes: Partial<M4kConfig>): Promise<void>;
    replace(values: M4kConfig): Promise<void>;
    clear(): Promise<void>;

    fileInfo(path: M4kPath): Promise<M4kFileInfo>;
    absolutePath(path: M4kPath): Promise<string>;
    mkdir(path: M4kPath): Promise<void>;
    ls(path: M4kPath, recursive?: boolean): Promise<string[]>;
    cp(path: M4kPath, dest: M4kPath): Promise<void>;
    mv(path: M4kPath, dest: M4kPath): Promise<void>;
    rm(path: M4kPath): Promise<void>;
    zip(path: M4kPath, dest?: M4kPath, uncompressed?: boolean): Promise<void>;
    unzip(path: M4kPath, dest?: M4kPath): Promise<void>;

    download(url: string, dest?: M4kPath): Promise<void>;

    pdfToImages(path: M4kPath, options?: M4kResizeOptions & { pages?: number[] }): Promise<M4kFileInfo[]>;
    resize(path: M4kPath, options?: M4kResizeOptions): Promise<string>;
    capture(options?: M4kResizeOptions): Promise<string>;

    readAsset(path: string, encoding?: 'utf8'|'base64'): Promise<string|undefined>;
    read(path: string, encoding?: 'utf8'|'base64'): Promise<string|undefined>;
    write(path: string, content: string, encoding?: 'utf8'|'base64', append?: boolean): Promise<void>;
    url(path: string): Promise<string>;
    reboot(): Promise<void>;
    restart(): Promise<void>;
    reload(): Promise<void>;
    exit(): Promise<void>;
    info(): Promise<M4kDeviceInfo>;
    
    log(level: string, message: string, data?: any, source?: string, line?: number): Promise<void>;
    // popLogs(count?: number): Promise<M4kLog[]>;
    
    // wvKey(): Promise<string>;
    // wvList(): Promise<Record<string, M4kWebViewConfig>>;
    // wvConfig(options: { reset?: boolean, [key: string]: M4kWebViewConfig|boolean|undefined }): Promise<void>;

    installedPackages(): Promise<String[]>;
    packageInfo(name: String): Promise<M4kPackageInfo>;
    startIntent(options: M4kIntentOptions|string): Promise<void>;

    installApk(path?: M4kPath): Promise<void>;

    openAutoStart(): Promise<void>;

    showMessage(message: string): Promise<void>;

    subscribe(listener?: (event: M4kEvent) => void): () => void;
    signal(event: M4kSignalEvent): void;
}