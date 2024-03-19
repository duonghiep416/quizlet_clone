const { Flashcard } = require('../../models')

module.exports = {
  editFlashcard: async (req, res) => {
    try {
      const { id: userId } = req.user
      const { id } = req.params
      const { front_content, back_content } = req.body
      if (!front_content || !back_content) {
        return res.status(400).json({
          status: 400,
          message: 'Front content and back content are required'
        })
      }
      const flashcard = await Flashcard.findOne({
        where: { id }
      })
      if (!flashcard) {
        return res.status(404).json({
          status: 404,
          message: 'Not found'
        })
      }
      if (flashcard.user_id !== userId) {
        return res.status(403).json({
          status: 403,
          message: 'You are not allowed to edit this flashcard'
        })
      }
      flashcard.front_content = front_content
      flashcard.back_content = back_content
      await flashcard.save()
      delete flashcard.dataValues.user_id
      delete flashcard.dataValues.course_id
      return res.status(200).json({
        status: 200,
        message: 'Success',
        data: flashcard
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Internal server error'
      })
    }
  }
}
