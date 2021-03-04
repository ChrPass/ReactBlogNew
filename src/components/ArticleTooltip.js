import React from 'react';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import DateRangeIcon from '@material-ui/icons/DateRange';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';
import {toShortDate} from '../common/Utils';

const ArticleTooltip = ({userName, creationDate, commentsCount, reactionsCount}) => (
  <Grid container alignItems="center" spacing="1">
    <Tooltip title="Author">
        <Grid item>
          <PersonIcon fontSize="small"/>{userName}
        </Grid>
    </Tooltip>
    <Tooltip title="Creation date">
        <Grid item>
          <DateRangeIcon fontSize="small"/>{toShortDate(creationDate)}
        </Grid>
    </Tooltip>
    <Tooltip title="Comments">
        <Grid item>
          <QuestionAnswerIcon fontSize="small"/>{commentsCount}
        </Grid>
    </Tooltip>
    <Tooltip title="Reactions">
        <Grid item>
          <VisibilityIcon fontSize="small"/>{reactionsCount}
        </Grid>
    </Tooltip>
  </Grid>
)

export default ArticleTooltip;