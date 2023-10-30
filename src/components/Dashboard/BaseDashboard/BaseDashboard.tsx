import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react';
import { Children, FC, ReactNode } from 'react';

interface IBaseDashboardProps {
    children: ReactNode;
    title: string;
}

export const BaseDashboard: FC<IBaseDashboardProps> = (props) => {
    const { children, title } = props;
    return (
        <Card>
            <CardHeader>
                <Heading>{title}</Heading>
            </CardHeader>
            <CardBody>{children}</CardBody>
        </Card>
    );
};
