import dayjs from 'dayjs'
import { Heading, Pane, Paragraph, Small, Table, Text } from 'evergreen-ui'
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLine, VictoryTheme } from 'victory'

import { gap } from '../styles/settings'

const runs = [
  {
    title: 'Morning run',
    date: '04 Jan 2021 10:00:00 GMT+0000',
    km: 3.31,
    duration: '23:00',
  },
  {
    title: 'Sunday morning run',
    date: '06 Dec 2020 10:00:00 GMT+0000',
    km: 2.99,
    duration: '19:09',
  },
]

function calculatePace(km, duration) {
  const [seconds, minutes = 0, hours = 0] = duration.split(':').reverse().map(n => parseInt(n))
  const durationInSeconds = hours * 60 * 60 + minutes * 60 + seconds

  // TODO return in mm:ss format, not mm.decimal
  // TODO also write tests
  return durationInSeconds / km
}

function formatPace(pace) {
  const seconds = parseInt(pace % 60)
  const minutes = Math.floor(pace / 60)

  return `${minutes}:${seconds.toString().padStart(2, 0)}`
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
  // This could be used as a popup
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
  const totalDist = runs.reduce((sum, run) => sum + run.km, 0)
  const avgPace = runs.reduce((sum, run) => sum + calculatePace(run.km, run.duration), 0) / runs.length
  const reversed = [...runs].reverse()

  return (
    <>
      <Paragraph>
        Total runs: {runs.length}<br />
        Total distance: {totalDist.toFixed(2)} km<br />
        Average distance: {(totalDist / runs.length).toFixed(2)} km<br />
        Average pace: {formatPace(avgPace)} min/km<br />
      </Paragraph>
      <Pane maxWidth={500}>
        <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
          <VictoryAxis tickFormat={x => dayjs(x).format('D MMM')} />
          <VictoryAxis dependentAxis tickFormat={x => `${x} km`} />
          <VictoryBar data={reversed} x="date" y="km" />
          <VictoryLine data={reversed} x="date" y="km" interpolation="natural" />
        </VictoryChart>
      </Pane>
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
              <Table.TextCell>{formatPace(calculatePace(run.km, run.duration))}</Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  )
}
