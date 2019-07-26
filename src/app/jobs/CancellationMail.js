import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class CancelletionMail {
  get key() {
    return 'CancelletionMail';
  }

  async handle({ data }) {
    const { appointiment } = data;

    await Mail.sendMail({
      to: `${appointiment.provider.name} <${appointiment.provider.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        provider: appointiment.provider.name,
        user: appointiment.user.name,
        date: format(
          parseISO(appointiment.date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancelletionMail();
