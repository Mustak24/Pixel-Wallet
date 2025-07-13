type Props = {
    when: boolean,
    children: React.ReactNode,
    otherwise?: React.ReactNode | null
}

export default function ShowWhen({when, children, otherwise=null}: Props): React.ReactNode | null {
    return when ? children : otherwise
}