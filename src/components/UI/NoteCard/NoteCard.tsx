import { useDispatch } from 'react-redux';
import {
  deleteNote,
  setEditedNote,
} from '../../../store/reducers/notesReducer';
import { INoteState } from '../../../types/types';
import { clearTags } from '../../../store/reducers/inputTagsReducer';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';

export function NoteCard(props: { note: INoteState; index: number }) {
  const { note, index } = props;
  const dispatch = useDispatch();
  return (
    <Card
      sx={{
        width: 250,
        marginBottom: '10px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h6">
          {note.text}
        </Typography>
      </CardContent>
      <CardContent sx={{ flexGrow: '1' }}>
        {note.tags.map((tag, ndx) => {
          return (
            <Typography
              key={ndx}
              gutterBottom
              component="span"
              sx={{ marginRight: '5px', fontSize: '12px' }}
            >
              {tag}
            </Typography>
          );
        })}
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button
          size="small"
          onClick={() => {
            dispatch(clearTags());
            dispatch(setEditedNote(index));
          }}
        >
          Edit
        </Button>
        <Button
          size="small"
          onClick={() => {
            dispatch(setEditedNote(null));
            dispatch(clearTags());
            dispatch(deleteNote(index));
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
