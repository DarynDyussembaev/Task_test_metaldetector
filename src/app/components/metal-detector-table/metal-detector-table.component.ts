import { Component, OnInit } from '@angular/core';
import { MetalDetector, MetalDetectorDirectory } from "../../model/MetalDetector";
import {MetalDetectorService} from "../../services/metal-detecter.service";
import { LanguageService } from "../../services/language-service";
import { MetalDetectorDirectoryService } from "../../services/metal-detector-directory.service";
import {MatDialog} from "@angular/material/dialog";
import {MetalDetectorFormDialogComponent} from "../metal-detector-form-dialog/metal-detector-form-dialog.component";


@Component({
  selector: 'app-metal-detector-table',
  templateUrl: './metal-detector-table.component.html',
  styleUrls: ['./metal-detector-table.component.scss']
})
export class MetalDetectorTableComponent implements OnInit {
  public types?: MetalDetectorDirectory[] = [];
  public countries?: MetalDetectorDirectory[] = [];
  public availabilities?: MetalDetectorDirectory[] = [];
  public metalDetectors: MetalDetector[] = [];
  public filteredDetectors: MetalDetector[] = [];
  public selectedTypeId: number | null = null;
  public selectedCountryId: number | null = null;
  public selectedAvailabilityId: number | null = null;
  searchTerm: string = '';

  constructor(
    public metalDetectorService: MetalDetectorService,
    public languageService: LanguageService,
    private metaldetectorDirectoryService: MetalDetectorDirectoryService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.setLanguage(this.languageService.getLanguage());
    this.loadMetalDetectorsByIds()
    this.loadTypes();
    this.loadCountries();
    this.loadAvailabilities();

  }


  setLanguage(language: string) {
    this.languageService.setLanguage(language);
    this.loadMetalDetectorsByIds();
  }

  loadMetalDetectorsByIds() {
    const language = this.languageService.getLanguage();
    this.metalDetectorService.loadMetalDetectorsByIds(language).subscribe(data => {
      this.metalDetectors = data;
      this.filteredDetectors = data;
    });
  }

  loadTypes() {
    const language = this.languageService.getLanguage();
    this.metaldetectorDirectoryService.getTypesMetalDetectors(language).subscribe(data => {
      this.types = data;
    });
  }

  loadCountries() {
    const language = this.languageService.getLanguage();
    this.metaldetectorDirectoryService.getCountriesManufacture(language).subscribe(data => {
      this.countries = data;
    });
  }

  loadAvailabilities() {
    const language = this.languageService.getLanguage();
    this.metaldetectorDirectoryService.getAvailabilityStatuses(language).subscribe(data => {
      this.availabilities = data;
    });
  }

  filterDetectors() {
    this.filteredDetectors = this.metalDetectors.filter(detector => {
      const matchesType = this.selectedTypeId ? detector.typeMetalDetectorsId === Number(this.selectedTypeId) : true;
      const matchesCountry = this.selectedCountryId ? detector.countryManufactureId === Number(this.selectedCountryId) : true;
      const matchesAvailability = this.selectedAvailabilityId ? detector.availabilityId === Number(this.selectedAvailabilityId) : true;
      const matchesSearchTerm = detector.brand.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesType && matchesCountry && matchesAvailability && matchesSearchTerm;
    });
  }

  metalDetectorDelete(id: number) {
    this.metalDetectorService.deleteMetalDetector(id).subscribe(() => {

      this.filteredDetectors = this.filteredDetectors.filter((metalDetector: MetalDetector) => metalDetector.id !== id);

      this.metalDetectors = this.metalDetectors.filter((metalDetector: MetalDetector) => metalDetector.id !== id);
    });
  }

  openFormDialog(detector?: MetalDetector): void {
    const dialogRef = this.dialog.open(MetalDetectorFormDialogComponent, {
      width: '500px',
      data: {
        id: detector?.id,
        detector: detector || {},
        types: this.types,
        countries: this.countries,
        availabilities: this.availabilities
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (detector) {
          this.metalDetectorService.updateMetalDetector(detector.id, result).subscribe(() => {
            this.loadMetalDetectorsByIds()
          });
        }
      }
    });
  }
  openAddDialog(detector?: MetalDetector) {
    const dialogRef = this.dialog.open(MetalDetectorFormDialogComponent, {
      data: {
        id: detector?.id,
        detector: detector,
        types: this.types,
        countries: this.countries,
        availabilities: this.availabilities
      },
    });

    dialogRef.afterClosed().subscribe((result: MetalDetector) => {
      if (result) {
        if (detector) {
          this.metalDetectorService.addMetalDetector(result).subscribe(() => {
            this.loadMetalDetectorsByIds();
          });
        }
      }

    })
  }
}

