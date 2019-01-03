const request = require("request");
const Comment = require("./../model/Comment");
const log = require("./../../utils/log-helper").getLogger("route-comment-repo");
var mongoose = require('mongoose'),
Types = mongoose.Types;

module.exports = class CommentRepository {
  constructor() {
    this._comment = new Comment();
    this._logger = log;
  }

  async saveComment(comment) {
    var self = this;
    try {
      var newComment = new Comment({
        user: comment.user_id,
        page: comment.page_id,
        s_score: Number(comment.sentiment_score),
        u_score: Number(comment.user_score),
        ip: comment.ip,
        country_code: comment.country_code,
        country_name: comment.country_name,
        city: comment.city,
        body: comment.body
      });

      // save page to database
      return await newComment.save();
    } catch (error) {
      self._logger.error("Save Comment Failed : ", error);
      return null;
    }
  }

  async getComments(page_id, index, size) {
    var self = this;
    try {
      var result = await Comment.paginate(
        { page: page_id },
        { page: index, limit: size, populate: ["user"], sort: "-updated_at" }
      );
      return result;
    } catch (error) {
      self._logger.error("Get Comments of Page Failed : ", error);
      return null;
    }
  }

  async likeComment(comment_id) {
    var self = this;
    try {
      let result = await Comment.update(
        { _id: comment_id },
        {
          $inc: {
            likes: 1
          }
        }
      );

      if (result && result.nModified > 0) {
        return true;
      }

      return false;
    } catch (error) {
      self._logger.error("Like a Comment of Page Failed : ", error);
      return null;
    }
  }

  async dislikeComment(comment_id) {
    var self = this;
    try {
      let result = await Comment.update(
        { _id: comment_id },
        {
          $inc: {
            dislikes: 1
          }
        }
      );

      if (result && result.nModified > 0) {
        return true;
      }

      return false;
    } catch (error) {
      self._logger.error("Dislike a Comment of Page Failed : ", error);
      return null;
    }
  }

  async getUserCommentOnPage(page_id, user_id) {
    var self = this;
    try {
      var result = await Comment.findOne({
        page: page_id,
        user: user_id
      }).populate("user");
      return result;
    } catch (error) {
      self._logger.error("getUserCommentOnPage Failed : ", error);
      return null;
    }
  }

  async getDailyTrend(page_id) {
    var self = this;
    var startDate = Date.now() - 31556952000; //minus 1 year

    try {
      var result = await Comment.aggregate([        
        {
            $match: {
                page: new Types.ObjectId(page_id),
                created_at: {$gt: new Date(startDate),$lt: new Date() }
            }
        },
        {
          $project: {
            day: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } }
          }
        },
        {
          $group: {
            _id: {
              day: "$day"
            },
            count: {
              $sum: 1
            }
          }
        }
      ]);      
      return result;
    } catch (error) {
      self._logger.error("Get Daily Trend of Page Failed : ", error);
      return null;
    }
  }
};
