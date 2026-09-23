const {
  getCompetitionById,
  getAllCompetitions,
} = require('../services/competitionService');

async function getCompetition(
  req,
  res,
  next
) {
  try {
    const competition =
      await getCompetitionById(
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: competition,
    });
  } catch (error) {
    next(error);
  }
}

async function getCompetitions(
  req,
  res,
  next
) {
  try {
    const competitions =
      await getAllCompetitions();

    res.status(200).json({
      success: true,
      data: competitions,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCompetition,
  getCompetitions,
};