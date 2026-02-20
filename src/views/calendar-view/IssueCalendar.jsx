import React, { PureComponent } from 'react';
import { Calendar } from '../../gadgets';

class IssueCalendarView extends PureComponent {
    render() {
        return (
            <div className="calendar-view">
                <Calendar isGadget={false} issueMode={true} />
            </div>
        );
    }
}

export default IssueCalendarView;
