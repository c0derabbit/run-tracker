import { Heading, Pane, Paragraph, Small, Text } from 'evergreen-ui'

import { gap } from '../styles/settings'

const Data = ({ label, value, isFirst }) => (
  <Pane marginRight={gap} paddingLeft={!isFirst && gap} borderLeft={!isFirst && 'default'}>
    <Paragraph>
      <Small>{label}</Small>
    </Paragraph>
    <Heading is="p" size={600}>{value}</Heading>
  </Pane>
)

export default function RunLog() {
  return (
    <Pane elevation={1} maxWidth={600} padding={gap} background="white">
      <Heading size={700}>
        Morning run
      </Heading>
      <Text size={300}>
        Today at 10:50
      </Text>
      <Pane display="flex" marginTop={gap / 2}>
        <Data label="Distance" value="3.77 km" isFirst />
        <Data label="Pace" value="6:06/km" />
        <Data label="Time" value="23m 0s" />
      </Pane>
    </Pane>
  )
}
