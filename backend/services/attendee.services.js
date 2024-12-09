const { User, Event } = require("../models/models");

/**
 * Attendee services
 *
 * @param {Express()} app - The express app
 */
const attendeeServices = (app) => {

  /**
   * Adds an attendee to an event
   *
   * @param {string} eventId - The event id
   * @param {string} userId - The user id
   *
   * @returns {json} - The updated event response in json format or an error response
   */
  app.put("/api/events/:eventId/add/:userId", (req, res, next) => {
    // Obtain event and user ids
    const eventId = req.params.eventId;
    const userId = req.params.userId;

    // Find user
    User.findById(userId)
      .then((user) => {
        if (!user) {
          res.status(404).end();
        }

        // Find event
        Event.findById(eventId)
          .then((event) => {
            if (!event) {
              res.status(404).end();
            }

            // Check if user is already an attendee
            if (event.attendees.includes(userId)) {
              return res.status(400).json({ error: "User is already an attendee" });
            }

            // Update user
            user.events = user.events.concat(eventId);
            User.findByIdAndUpdate(userId, user, {
              new: true,
              runValidators: true,
              context: "query",
            }).catch((err) => next(err));

            // Update event
            event.attendees = event.attendees.concat(userId);
            Event.findByIdAndUpdate(eventId, event, {
              new: true,
              runValidators: true,
              context: "query",
            })
              .then((updatedEvent) => {
                res.json(updatedEvent);
              })
              .catch((err) => next(err));
          })
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });

  /**
   * Removes an attendee from an event
   *
   * @param {string} eventId - The event id
   * @param {string} userId - The user id
   *
   * @returns {json} - The updated event response in json format or an error response
   */
  app.put("/api/events/:eventId/remove/:userId", (req, res, next) => {
    // Obtain event and user ids
    const eventId = req.params.eventId;
    const userId = req.params.userId;

    // Find event
    Event.findById(eventId).then((event) => {
      if (!event) {
        res.status(404).end();
      } else {
        // Find user
        User.findById(userId).then((user) => {
          if (!user) {
            res.status(404).end();
          } else {
            // Update user
            user.events = user.events.filter((eventId) => eventId !== eventId);
            User.findByIdAndUpdate(userId, user, {
              new: true,
              runValidators: true,
              context: "query",
            }).catch((err) => next(err));

            // Update event
            event.attendees = event.attendees.filter(
              (attendee) => attendee !== userId
            );
            Event.findByIdAndUpdate(eventId, event, {
              new: true,
              runValidators: true,
              context: "query",
            })
              .then((updatedEvent) => {
                res.json(updatedEvent);
              })
              .catch((err) => next(err));
          }
        });
      }
    });
  });

  /**
   * Get all attendees of an event
   *
   * @param {string} eventId - The event id
   *
   * @returns {json} - The list of attendees in json format or an error response
   */
  app.get("/api/events/:eventId/attendees", (req, res, next) => {
    // Obtain event id
    const eventId = req.params.eventId;

    // Find event
    Event.findById(eventId)
      .then((event) => {
        if (!event) {
          res.status(404).end();
        } else {
          // Find all attendees
          User.find({ _id: { $in: event.attendees } })
            .then((attendees) => {
              res.json(attendees);
            })
            .catch((err) => next(err));
        }
      })
      .catch((err) => next(err));
  });

  /**
   * Get all events of an attendee
   *
   * @param {string} userId - The user id
   *
   * @returns {json} - The list of events in json format or an error response
   */
  app.get("/api/users/:userId/events", (req, res, next) => {
    // Obtain user id
    const userId = req.params.userId;

    // Find user
    User.findById(userId)
      .then((user) => {
        if (!user) {
          res.status(404).end();
        } else {
          // Find all events
          Event.find({ _id: { $in: user.events } })
            .then((events) => {
              res.json(events);
            })
            .catch((err) => next(err));
        }
      })
      .catch((err) => next(err));
  });
};

module.exports = attendeeServices;
