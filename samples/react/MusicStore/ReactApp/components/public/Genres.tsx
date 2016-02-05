import * as React from 'react';
import { Link } from 'react-router';
import { provide } from '../../TypedRedux';
import { ApplicationState }  from '../../store';
import * as GenreList from '../../store/GenreList';

class Genres extends React.Component<GenresProps, void> {
    componentWillMount() {
        if (!this.props.genres.length) {
            this.props.requestGenresList();
        }
    }

    public render() {
        let { genres } = this.props;
        
        return <div>
            <h3>Browse Genres</h3>

            <p>Select from { genres.length || '...' } genres:</p>

            <ul className="list-group">
            {genres.map(genre =>
                <li key={ genre.GenreId } className="list-group-item">
                    <Link to={ '/genre/' + genre.GenreId }>
                        { genre.Name }
                    </Link>
                </li>
            )}
            </ul>
        </div>;
    }
}

// Selects which part of global state maps to this component, and defines a type for the resulting props
const provider = provide(
    (state: ApplicationState) => state.genreList,
    GenreList.actionCreators
);
type GenresProps = typeof provider.allProps;
export default provider.connect(Genres);
