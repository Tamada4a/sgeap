package com.example.sgeap.changelogs;

import com.example.sgeap.dto.InstituteDTO;
import com.example.sgeap.interfaces.InstituteRepository;
import io.mongock.api.annotations.ChangeUnit;
import io.mongock.api.annotations.Execution;
import io.mongock.api.annotations.RollbackExecution;

import java.util.ArrayList;
import java.util.Arrays;

@ChangeUnit(id = "InstitutesInitChangelog", order = "1", author = "Tamada")
public class InstitutesChangeLog {
    @Execution
    public void changeSet(InstituteRepository directionRepository) {
        getDirections()
                .forEach(directionRepository::save);
    }


    @RollbackExecution
    public void rollback() {
    }


    private ArrayList<InstituteDTO> getDirections() {
        return new ArrayList<>(Arrays.asList(
                new InstituteDTO(
                        "ИАРКТ",
                        new ArrayList<>(Arrays.asList("01.03.03", "01.04.03", "15.03.01", "15.03.05", "15.04.03", "22.03.02", "22.04.02", "23.03.01", "23.04.01", "24.03.01", "24.03.04", "24.04.01", "24.04.02", "24.04.04", "24.05.01", "24.05.07", "25.03.01", "25.03.02", "25.04.01", "25.04.02", "27.03.02"))
                ),
                new InstituteDTO(
                        "ИДЭУ",
                        new ArrayList<>(Arrays.asList("01.04.02", "01.04.03", "13.03.03", "15.03.02", "15.03.04", "15.03.05", "24.03.05", "24.04.05", "24.05.02"))
                ),
                new InstituteDTO(
                        "ИИК",
                        new ArrayList<>(Arrays.asList("01.03.02", "01.04.02", "02.03.02", "02.04.02", "03.03.01", "03.04.01", "09.03.01", "09.04.01", "10.05.03", "11.03.01", "11.03.03", "11.03.04", "11.04.01", "11.04.03", "11.05.01", "12.03.04", "12.03.05", "12.04.04"))
                ),
                new InstituteDTO(
                        "Институт экономики и управления",
                        new ArrayList<>(Arrays.asList("38.03.01", "38.03.02", "38.03.03", "38.03.04", "38.03.05", "38.04.01", "38.04.02", "38.04.03", "38.04.04", "38.04.05", "44.03.02"))
                ),
                new InstituteDTO(
                        "Естественнонаучный\nинститут",
                        new ArrayList<>(Arrays.asList("01.03.03", "01.04.01", "01.04.03", "01.05.01", "02.03.03", "03.03.02", "03.04.02", "04.03.01", "04.04.01", "04.05.01", "06.03.01", "06.04.01", "10.03.01", "10.04.01", "10.05.01", "28.03.02"))
                ),
                new InstituteDTO(
                        "Социально-гуманитарный институт",
                        new ArrayList<>(Arrays.asList("37.03.01", "37.04.01", "39.03.01", "39.03.02", "39.04.01", "39.04.02", "41.03.05", "42.03.01", "42.03.02", "42.03.03", "42.03.04", "44.03.01", "44.03.02", "44.04.02", "45.03.01", "45.03.02", "45.04.01", "46.03.01", "46.03.02", "46.04.01", "47.04.01"))
                ),
                new InstituteDTO(
                        "Юридический институт",
                        new ArrayList<>(Arrays.asList("40.03.01", "40.04.01"))
                )
        ));
    }
}
