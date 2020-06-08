import React from "react";
import { Card, Image } from "semantic-ui-react";
import PropTypes from "prop-types";

export default function DisplayCard() {
  return (
    <Card>
      <Image src="/images/avatar/large/matthew.png" wrapped ui={false} />
      <Card.Content>
        <Card.Header>Matthew</Card.Header>
        <Card.Meta>
          <span className="date">Joined in 2015</span>
        </Card.Meta>
        <Card.Description>
          Matthew is a musician living in Nashville.
        </Card.Description>
      </Card.Content>
      <Card.Content extra></Card.Content>
    </Card>
  );
}
