package builder.java.vocation;

import java.util.List;

public class ThreeDayVocationBuilder implements VocationBuilder {

  private String mBeginDate;
  private String mEndDate;
  private Hotel mHotel;
  private Restaurant mRestaurent;
  private List<String> mTickets;

  ThreeDayVocationBuilder() {
    // empty constructor.
  }

  ThreeDayVocationBuilder(
      String mBeginDate,
      String mEndDate,
      Hotel mHotel,
      Restaurant mRestaurent,
      List<String> mTickets) {
    this.mBeginDate = mBeginDate;
    this.mEndDate = mEndDate;
    this.mHotel = mHotel;
    this.mRestaurent = mRestaurent;
    this.mTickets = mTickets;
  }

  @Override
  public VocationBuilder setBeginDate(String date) {
    mBeginDate = date;
    return this;
  }

  @Override
  public VocationBuilder setEndDate(String date) {
    mEndDate = date;
    return this;
  }

  @Override
  public VocationBuilder setHotel(Hotel hotel) {
    mHotel = hotel;
    return this;
  }

  @Override
  public VocationBuilder setRestaurant(Restaurant restaurant) {
    mRestaurent = restaurant;
    return this;
  }

  @Override
  public VocationBuilder setTicket(List<String> tickets) {
    mTickets = tickets;
    return this;
  }

  @Override
  public VocationBuilder create() {
    return new ThreeDayVocationBuilder(mBeginDate, mEndDate, mHotel, mRestaurent, mTickets);
  }

  @Override
  public String toString() {
    return "mBeginDate: " + this.mBeginDate +
        ";\n mEndDate: " + this.mEndDate +
        ";\n mHotel: " + this.mHotel +
        ";\n mRestaurent: " + this.mRestaurent +
        ";\n mTickets: " + this.mTickets;
  }
}
