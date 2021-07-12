const _ = require('lodash');
const { Path } = require('path-parser');
const {URL} = require('url');

const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

//Notes about req.body contains all the information passed along in this request(api/surveys).(body-phrase) 
module.exports = (app) => {
  app.get('/api/surveys',requireLogin,async (req,res) =>{
    const surveys = await Survey.find({_user:req.user.id}).select({
      recipients: false
    });
    res.send(surveys);
  });


  app.get('/api/surveys/:surveyId/:choice',(req,res) =>{
    res.send('Thanks for voting')
  });

  //logic of this code is in course 192 //used for handle response from user
  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponsed: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });


  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(',')
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    //Send email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try{
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user); //we send back so our header would update the credit.
    }catch(err){
      res.status(442).send(err);
    }
    
  });
};
