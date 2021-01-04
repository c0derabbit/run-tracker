import dayjs from 'dayjs'
import { Heading, Pane, Paragraph, Small, Table, Text } from 'evergreen-ui'

import { gap } from '../styles/settings'

const runs = [
  {
    title: 'Morning run',
    date: '04 Jan 2021 10:00:00 GMT+0000',
    km: 3.77,
    duration: '23:00',
  },
  {
    title: 'Morning run',
    date: '03 Jan 2021 10:00:00 GMT+0000',
    km: 3.77,
    duration: '23:00',
  },
  {
    title: 'Morning run',
    date: '02 Jan 2021 11:00:00 GMT+0000',
    km: 3.77,
    duration: '23:00',
  },
  {
    title: 'Morning run',
    date: '04 Jan 2020 11:00:00 GMT+0000',
    km: 10,
    duration: '1:00:50',
  },
]

function calculatePace(km, duration) {
  const [seconds, minutes = 0, hours = 0] = duration.split(':').reverse().map(n => parseInt(n))
  const durationInMinutes = hours * 60 + minutes + seconds / 60

  return (durationInMinutes / km).toFixed(2)
}

function formatDate(date) {
  const run = dayjs(date)
  const today = dayjs()

  const sameMonth = run.get('year') === today.get('year') && run.get('month') === today.get('month')

  if (sameMonth && run.get('date') === today.get('date')) {
    return `Today at ${run.format('HH:mm')}`
  } else if (sameMonth && run.get('date') === today.subtract(1, 'day').get('date')) {
    return `Yesterday at ${run.format('HH:mm')}`
  } else {
    return run.format('D MMM, YYYY')
  }
}

const Data = ({ label, value, isFirst }) => (
  <Pane marginRight={gap} paddingLeft={!isFirst && gap} borderLeft={!isFirst && 'default'}>
    <Paragraph>
      <Small>{label}</Small>
    </Paragraph>
    <Heading is="p" size={600}>{value}</Heading>
  </Pane>
)

const Card = ({ title, date, km, duration }) => (
  <Pane elevation={1} maxWidth={600} padding={gap} background="white">
    <Heading size={700}>
      {title}
    </Heading>
    <Text size={300}>
      {formatDate(date)}
    </Text>
    <Pane display="flex" marginTop={gap / 2}>
      <Data label="Distance" value={km} isFirst />
      <Data label="Pace" value={calculatePace(km, duration)} />
      <Data label="Time" value={duration} />
    </Pane>
  </Pane>
)

export default function RunLog() {
  return (
    <>
      {Card(runs[0])}
      <Table elevation={1} marginTop={gap} background="white">
        <Table.Head>
          <Table.TextHeaderCell>
            Date
          </Table.TextHeaderCell>
          <Table.TextHeaderCell>
            Distance
          </Table.TextHeaderCell>
          <Table.TextHeaderCell>
            Duration
          </Table.TextHeaderCell>
          <Table.TextHeaderCell>
            Pace (min/km)
          </Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height={240}>
          {runs.map(run => (
            <Table.Row key={run.date} isSelectable onSelect={() => alert(JSON.stringify(run))}>
              <Table.TextCell>{formatDate(run.date)}</Table.TextCell>
              <Table.TextCell>{run.km} km</Table.TextCell>
              <Table.TextCell>{run.duration}</Table.TextCell>
              <Table.TextCell>{calculatePace(run.km, run.duration)}</Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  )
}
