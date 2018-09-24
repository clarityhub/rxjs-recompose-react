import { setObservableConfig } from 'recompose';
import { from } from 'rxjs';


setObservableConfig({
    fromESObservable: from,
    toESObservable: function toESObservable(stream) {
        return stream;
    },
});
