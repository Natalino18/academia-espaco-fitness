import { Photo } from '../components/Photo';
import { Icon } from '../components/Icon';
import { schedule } from '../data/schedule';
export function Schedule() {
  return <section id="horarios" className="schedule section" tabIndex={-1} aria-labelledby="schedule-title">
    <div className="schedule-image"><Photo id={6} decorative /><div /></div>
    <div className="wrap schedule-layout"><div className="schedule-title" data-reveal><p className="eyebrow">04 / Funcionamento</p><h2 id="schedule-title"><em>HORÁRIOS</em><br />PARA VOCÊ TREINAR<br />NO SEU RITMO.</h2></div><Icon name="clock" className="schedule-clock" />
      <div className="schedule-times" data-reveal>{schedule.map(day => <div key={day.day}><span>{day.day}</span><p>{day.open}<small> ÀS </small>{day.close}</p></div>)}</div>
    </div>
  </section>;
}
