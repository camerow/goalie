import React from 'react';
import {
    Panel,
    PanelFooter, 
    PanelHeader,
    Text,
    Button,
    Space,
    Heading
} from 'rebass';
import { Container, Row, Col } from 'react-grid-system';

const TeamActionsList = ({ teamActions, onDeleteTeamAction }) => {
    return (
        <div style={{ border: '#fff', padding: '24px'}}>
            <Container>
                <Row>
                {
                    teamActions.map((action, i) => {
                        return (
                            <Col key={i} lg={3}>
                                <Panel key={i + `-${action.name}`} theme="info">
                                    <PanelHeader theme="primary">
                                        {action.name}
                                    </PanelHeader>
                                    <Text>
                                        Goal: {action.goal}
                                    </Text>
                                    <PanelFooter theme="secondary">
                                        Added By {action.displayName ? `${action.displayName}` : 'Unknown'}
                                        <Space x={2}/>
                                        <Button backgroundColor="red" onClick={() => onDeleteTeamAction(i) }>Delete</Button>
                                    </PanelFooter>
                                </Panel>
                            </Col>
                        );
                    })
                }
                </Row>
            </Container>
        </div>
    );
}

export default TeamActionsList;