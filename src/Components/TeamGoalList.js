import React from 'react';
import {
    Panel,
    PanelFooter,
    PanelHeader,
    Text,
    Button,
    Space,
    PageHeader,
    Rating,
    Dropdown,
    DropdownMenu,
    NavItem,
    Arrow
} from 'rebass';
import { Container, Row, Col } from 'react-grid-system';

const TeamGoalList = ({openMenu, menusOpen, teamActions, onDeleteTeamAction, updateRating }) => {
    return (
        <div style={{ border: '#fff', padding: '24px'}}>
            <Container>
                <PageHeader
                    style={{marginTop: '16px', paddingTop: '16px'}}
                    theme="info"
                    heading="Team Goals"
                />
                <Row>
                {
                    teamActions.map((action, i) => {
                        return (
                            <Col key={i} lg={3}>
                                <Panel key={i + `-${action.name}`} theme="info">
                                    <PanelHeader theme="primary">
                                        {action.name}
                                        {/*<Dropdown onClick={ () => openMenu(i) }>
                                            <Button
                                                backgroundColor="primary"
                                                color="white"
                                                inverted
                                                rounded
                                            >
                                                Dropdown
                                                <Arrow direction="down" />
                                            </Button>
                                            <DropdownMenu open={menusOpen[i]}>
                                                <NavItem is="a">
                                                Hello
                                                </NavItem>
                                                <NavItem is="a">
                                                Hi
                                                </NavItem>
                                            </DropdownMenu>
                                        </Dropdown>*/}
                                        <Space x={2} />

                                        <Rating
                                            onClick={(index) => updateRating(action, index)}
                                            color="orange"
                                            value={action.rating || 0} />
                                    </PanelHeader>
                                    <Text>
                                        {action.goal}
                                    </Text>

                                    <PanelFooter theme="secondary">
                                        Added By {action.displayName ? `${action.displayName}` : 'Unknown'}
                                        <Space x={2} />
                                        <Button
                                            backgroundColor="red"
                                            onClick={() => onDeleteTeamAction(action) }>
                                            Delete
                                        </Button>
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

export default TeamGoalList;