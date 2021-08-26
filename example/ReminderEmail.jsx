export const ReminderEmail = ({ firstName, task }) => ({
  subject: `Don't forget ${firstName}!`,
  body: (
    <div>
      <p>Hello {firstName},</p>
      <p>You asked me to remind you about "{task}"!</p>
      <p>See you!</p>
    </div>
  ),
})
