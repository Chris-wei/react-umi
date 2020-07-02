import React from 'react';
import {Button} from 'antd';
import ReportCard from './components/ReportCard'
import {Link} from 'umi';
import Container from '@/components/Container';

const Index = () => {
    return (
        <Container>
            <Button type={"primary"} size={'middle'}>
                <Link to={'/report/write'}>写日报</Link>
            </Button>
            <ReportCard/>
        </Container>
    )
}


export default Index;
