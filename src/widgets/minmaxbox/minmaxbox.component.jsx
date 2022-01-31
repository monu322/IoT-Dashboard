import React from "react";

import './minmaxbox.styles.scss';

import {
    Card,
    CardHeader,
    CardTitle,
    Row,
    Col,
  } from "reactstrap";

function MinMaxBox(props) {
    return (
        <Card className="card-chart">
            <CardHeader>
                <CardTitle className="mb-1" tag="h3">
                <Row>
                <Col xs="6">
                    <h5 className="card-category">Valve Positions</h5>
                    <props.Icon className="widget-icon"/>
                </Col>
                <Col xs="6">
                    <Row>
                    <Col xs="12">
                        <span className="widget-label">Avg</span><span className="widget-value-avg">56</span>
                    </Col>
                    </Row>
                    <Row>
                    <Col xs="6">
                        <span className="widget-label">Min</span><span className="widget-value">54</span>
                    </Col>
                    <Col xs="6">
                        <span className="widget-label">Max</span><span className="widget-value">58</span>
                    </Col>
                    </Row>
                </Col>
                </Row>
                </CardTitle>
            </CardHeader>
        </Card>
    )
}

export default MinMaxBox;