import { HTMLAttributes } from "react";
import { Css, clsx } from "../helpers/html";
import { useCss } from "../hooks/useCss";
import { flexCenter, flexColumn, flexRow } from "../helpers/flexBox";
import { Div } from "./Div";

const css: Css = {
    '&': {
        border: 0,
        borderCollapse: 'collapse',
        m: 0.5,
        rounded: 2,
        elevation: 1,
    },
    '&Row': {
        borderCollapse: 'collapse',
        w: '100%',
    },
    '&Row-success': { fg: 'success' },
    '&Row-error': { fg: 'error' },
    '&Row-selected': { fg: 'selected' },
    '&Row:nth-child(even)': { bg: '#ffffff70' },
    '&Row:hover': {  bg: 'transparent', elevation: 1 },
    '&Cell': {
        border: '1px solid #ddd',
        textAlign: 'left',
        h: 3,
    },
    '&CellContent': {
        ...flexColumn({ align: 'stretch', justify: 'center' }),
        px: 0.5,
        position: 'relative',
        h: 3,
    },
    '&Cell-row &CellContent': {
        ...flexRow({ align: 'center', justify: 'start' }),
    },
    '&Cell-center &CellContent': {
        ...flexCenter({}),
    },
    '&Cell-around &CellContent': {
        ...flexRow({ align: 'center', justify: 'around' }),
    },
    '&Cell-header': {
        pt: 1,
        bg: 'white',
        fg: 'primary',
        borderTop: 0,
    },
    '& input': {
        background: 'transparent',
        border: 0,
    },
    '& *[draggable="true"]': {
        cursor: 'grab',
    },
    '& .dragging': {
        // visibility: 'hidden',
    }
}

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
    cls?: any
};
export const Table = ({ cls, ...props }: TableProps) => {
    const c = useCss('Table', css)
    return <table className={clsx(c, cls)} {...props} />;
};

export interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
    cls?: any
};
export const TableHead = ({ cls, ...props }: TableHeadProps) => {
    const c = useCss('Table', css)
    return <thead className={clsx(`${c}Head`, cls)} {...props} />;
};

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
    cls?: any
};
export const TableBody = ({ cls, ...props }: TableBodyProps) => {
    const c = useCss('Table', css)
    return <tbody className={clsx(`${c}Body`, cls)} {...props} />;
};

export interface TableFootProps extends HTMLAttributes<HTMLTableSectionElement> {
    cls?: any
};
export const TableFoot = ({ cls, ...props }: TableFootProps) => {
    const c = useCss('Table', css)
    return <tfoot className={clsx(`${c}Head`, cls)} {...props} />;
};

export interface RowProps extends HTMLAttributes<HTMLTableRowElement> {
    mode?: 'success'|'error'|'selected';
    cls?: any
};
export const Row = ({ cls, mode, ...props }: RowProps) => {
    const c = useCss('Table', css);
    return (
        <tr className={clsx(
            `${c}Row`,
            mode && `${c}Row-${mode}`,
            cls
        )} {...props} />
    );
};

export interface CellProps extends HTMLAttributes<HTMLTableCellElement> {
    variant?: 'row'|'center'|'around';
    cls?: any,
};
export const Cell = ({ cls, variant, children, ...props }: CellProps) => {
    const c = useCss('Table', css);
    return (
        <td className={clsx(`${c}Cell`, variant && `${c}Cell-${variant}`, cls)} {...props}>
            <div className={`${c}CellContent`}>
                {children}
            </div>
        </td>
    );
};

export interface CellHeaderProps extends HTMLAttributes<HTMLTableCellElement> {
    variant?: 'row'|'center';
    cls?: any;
};
export const CellHeader = ({ cls, variant, children, ...props }: CellHeaderProps) => {
    const c = useCss('Table', css);
    return (
        <th className={clsx(`${c}Cell ${c}Cell-header`, variant && `${c}Cell-${variant}`, cls)} {...props}>
            <Div cls={`${c}CellContent`}>
                {children}
            </Div>
        </th>
    );
}
