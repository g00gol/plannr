import React, { useState, useContext, useEffect } from 'react';
import { TripData } from '../dataObjects/TripData';
import { AuthContext } from './AuthContext';

export const TripContext = React.createContext<TripData>(new TripData("My Trip", []));

// create functions for mutating tripcontext here; will use replace instead of mutation for statefulness
export const TripProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [currentTrip, setCurrentTrip] = useState<TripData>(new TripData("My Trip", []));
    const [loadingTrip, setLoadingTrip] = useState<boolean>(true);
    const currentUser = useContext(AuthContext);
    useEffect(() => {
        // load trip if user has trip in session
    }, []);
    
    return (
        <TripContext.Provider value={currentTrip}>{children}</TripContext.Provider>
    )
}