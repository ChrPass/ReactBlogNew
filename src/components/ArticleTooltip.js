import React from 'react';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import DateRangeIcon from '@material-ui/icons/DateRange';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';
import { toShortDate } from '../common/Utils.js';

const ArticleTooltip = ({article}) => (
  <Grid container alignItems="center" spacing="1">
    <Tooltip title="Author">
        <Grid item>
          <PersonIcon fontSize="small"/>{article.user.name}
        </Grid>
    </Tooltip>
    <Tooltip title="Creation date">
        <Grid item>
          <DateRangeIcon fontSize="small"/>{toShortDate(article.created_at)}
        </Grid>
    </Tooltip>
    <Tooltip title="Comments">
        <Grid item>
          <QuestionAnswerIcon fontSize="small"/>{article.comments_count}
        </Grid>
    </Tooltip>
    <Tooltip title="Reactions">
        <Grid item>
          <VisibilityIcon fontSize="small"/>{article.public_reactions_count}
        </Grid>
    </Tooltip>
  </Grid>
)

export default ArticleTooltip;